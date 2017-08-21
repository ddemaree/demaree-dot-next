# This is my web site.

This is the codebase for the next version of `demaree.me`, my personal web site.

It's broken into a few parts:

## WordPress (`./wordpress`)

My site's content management system is WordPress. However, I'm using it as a headless CMS—the web site (see "Frontend" below) consumes blog posts and page content as JSON, via the WordPress REST API, and presents it through the magic of JavaScript.

My WordPress install runs as a Docker container; this repo contains the `Dockerfile` to build that container, plus some custom code and config, including a theme called `birthdaysuit` that (on purpose) does not display any content.

## Frontend (`./frontend`)

The actual web site is a [Next.js](https://github.com/zeit/nextjs) application. Next is a framework based on React and Webpack, designed to provide a very simple, PHP-like dev experience, with cool React features server-side rendering and hot reloading in dev.

The main web app has a few main endpoints:

* `/index` (or `/`): Right now this is a blog front page, but may add other sections or change entirely later on.
* `/posts?page=:page`: Same.
* `/posts/show?id=:slug`: Single blog post view

By default, while in development the site uses the production WordPress API (and, as such, real content), but can be re-pointed to a dev instance of WordPress by setting the `POSTS_API` environment variable.

One reason why I've set up the frontend this way (other than as a fun project to learn a new dev stack) is so I can easily pull in other sources of information, besides WordPress posts and pages. For example, as of 8/21/17 one of the next things I plan to work on is a version of my famous restaurant to-do list, using [Airtable](https://airtable.com) as a backend.

## Docker

All the Docker containers in this repo are meant to be run in development via `docker-compose`. The simplest way to get up and running is to run `docker-compose up`.

> **DD FIXME:** Note that right now, the `frontend` service is pointed at the production API, yet `dc up` will bring up all services and then not use most of them. Should default to using the dev stuff, and have a shortcut for starting `frontend` with production APIs.

### Frontend

Most of the time, the only thing that needs to run is the `frontend` service (because it relies on production WordPress by default), so to start this project you can do:

```sh
docker-compose up frontend
```

Pro tip: I like to alias `docker-compose` as `dc`, so this could also be:

```sh
dc up frontend
```

If there've been substantial changes to the codebase since the last Docker build, it doesn't hurt to add the `--build` flag to force a rebuild before starting the container:

```sh
dc up --build frontend
```

### WordPress

To work offline, or to do stuff that may require changes to the WordPress container (e.g. customizing the API payload, which is a thing the `birthdaysuit` theme does), it's best to start the `wordpress` service in detached mode, since it doesn't need to be restarted as often and PHP picks up changes on the fly more easily.

```sh
dc up -d --build wordpress
```

This local WordPress runs on port 8080. You can tell the `frontend` service to use it by passing in the env variable `POSTS_API`, like so:

```sh
dc up -e POSTS_API=http://localhost:8080 frontend
```

This container depends on a running MySQL service, which `docker-compose` will start up automatically when bringing up WordPress.

This WordPress image is based on [the default Apache-based one on Docker Hub](https://hub.docker.com/_/wordpress), which has a bad habit of creating an anonymous volume for its `/var/www/html` directory, which can get outdated junk in it. From time to time, it makes sense to blow away old WordPress images/containers/volumes and start over.

```sh
# Don't forget to stop it if it's already running
dc stop wordpress

# Remove the existing WordPress image(s) and any volumes attached to them
dc rm -v wordpress

# Bring up a new instance
dc up -d --build wordpress
```

## Deployment

Because of the service-oriented architecture at play here, it's possible (in fact encouraged) to deploy each of these things separately—at different times, and even onto different hosting platforms.

Production images live on a private Docker registry at `dkr.demar.ee`.