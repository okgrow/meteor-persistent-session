Purpose
=======
Make Meteor's `Session` object persist its values locally and across page
refreshes. Meteor's default implementation loses values whenever the page is
refreshed.

Uses [amplifyjs's store](http://amplifyjs.com/api/store/) library to save
values in the browsers `localStorage`, falling back to other solutions if it's
not available.

Installation
============
You must use Meteorite for your project.

In your `smart.json` file:

```json
{
  "packages": {
    "meteor-persistent-session": {
      "git": "https://github.com/okgrow/meteor-persistent-session.git",
      "branch": "master"
    }
  }
}
```

Usage
=====

Use `Session.set()` and `Session.get()` normally. The values will be persisted
across browser sessions.

If you want `set()` to behave as it does normally in Meteor, use
`Session.setTemporary()`, which will cause the key-value-pair not to persist,
and it will be lost upon browser refresh.

If you want to clear all set values, you can call `Session.clear()`, this will
clear all key-value-pairs set using `Session.set()` or
`Session.setTemporary()`.

By default, `Session.clear()` is called when the user signs-out. To disable this
behaviour, set `persistent_session.clear_on_signout` to false in your
`config/settings.json` file:

```json
{
  "public": {
    "persistent_session": {
      "clear_on_signout": true
    }
  }
}
```

See EventedMind's screen on [organizing environment variables and settings](https://www.eventedmind.com/feed/meteor-organizing-environment-variables-and-settings)
for more information.

TODO
====

* Tests

License
=======

The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
