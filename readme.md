# Black Gold Boom :: Rough Ride

## Development

Copy htaccess and index dist files.

```bash
cp .htaccess.dist .htaccess
cp index.html.dist index.html
```

### Setup

```bash
npm install
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

For a partial deploy, it's enough to run `bbb release` and then copy the desired files from `dist`. We seem to be using the files from `dist/debug` rather than the minified `dist/release`, for whatever reason.

The important directory on the server is `html/dist/debug`. You'll want to copy stuff from the local `dist/debug`. For some reason, the app makes requests to `assets/js/libs`, but these are rewritten to actually serve files from `dist`. Very confusing!
