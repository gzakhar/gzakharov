# Run Proof

This document records a live execution of the static site server to verify the
execution environment can actually run processes (not just edit files).

## Steps performed

1. Started the server:

   ```
   http-server -p 8080 &
   ```

   Output:

   ```
   Starting up http-server, serving ./

   http-server version: 14.1.1

   http-server settings:
   CORS: disabled
   Cache: 3600 seconds
   Connection Timeout: 120 seconds
   Directory Listings: visible
   AutoIndex: visible
   Serve GZIP Files: false
   Serve Brotli Files: false
   Default File Extension: none

   Available on:
     http://127.0.0.1:8080
     http://172.17.0.2:8080
   Hit CTRL-C to stop the server
   ```

2. Verified it responds. `curl` was not available in this environment, so the
   equivalent request was made with Node's built-in `http` module:

   ```
   node -e "
   http = require('http');
   http.get('http://127.0.0.1:8080/', (res) => {
     console.log(res.statusCode);
     res.resume();
   });
   "
   ```

   Observed output:

   ```
   200
   ```

3. Stopped the server (`kill <pid>` on the backgrounded `http-server`
   process), and confirmed via `pgrep -fa http-server` that no server process
   remained.

## Observed HTTP status code

**200**

## `ls` output of the repo root

```
_config.yml
_includes
_layouts
_posts
humans.txt
ideas.html
index.html
styles.css
```
