# Black Gold Boom :: Rough Ride

Latest version of the code is at: https://github.com/iangreenleaf/Black-Gold-Boom/

## Development

### Setup

Note: The build system depends on some very old and outdated node modules.
These are all checked in to the repository to avoid future installation problems.
The dependency tree is not even technically valid, but as of Node v9.5.0 it's still running fine.

```bash
npm install
```

Note: Below are the directions provided with the original code. I do not know if this still works for local development.

Copy htaccess and index dist files.

```bash
cp .htaccess.dist .htaccess
cp index.html.dist index.html
```

### Build Commands

```bash
bbb watch
```

```bash
bbb debug
```

```bash
bbb release
```

## Production

Install at the web root or sub-domain, not in a sub-directory.

Tested on Linux version 2.6.18-028stab101.1 with Apache/2.2.22. Be sure mod_rewrite module is installed. htaccess file may need to be modified if app is not run from root directory.

### Deploy notes

There is FTP access to the current server, so I've just been building the files locally and dropping them over there.

For a partial deploy, it's enough to run `bbb release` and then copy the desired files from `dist`. We seem to be using the files from `dist/debug` rather than the minified `dist/release`, for whatever reason.

The important directory on the server is `html/dist/debug`. You'll want to copy stuff from the local `dist/debug`. For some reason, the app makes requests to `assets/js/libs`, but these are rewritten to actually serve files from `dist`. Very confusing!
