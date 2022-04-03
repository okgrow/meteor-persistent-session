Purpose
=======
Make Meteor's `Session` object persist its values locally and across page
refreshes. Meteor's default implementation loses values whenever the page is
refreshed.

Uses [amplifyjs's store](http://amplifyjs.com/api/store/) library to save
values in the browsers `localStorage`, falling back to other solutions if it's
not available.

Upgrading from 0.2.x to 0.3.x and 2.6.1
======================================

The default behaviour of `Session.set` has been changed. `default_method` now
defaults to `temporary` (as was mentioned in the docs), rather than
`persistent`, which was what it was set to in the code.

This means that to keep the behaviour the same, you should set `default_method`
to `persistent`:

`config/settings.json` file:
```json
{
  "public": {
    "persistent_session": {
      "default_method": "persistent"
    }
  }
}
```

Installation
============
```
meteor add designveloper:persistent-session
```
**Note:** To use persistent-session, your project must have Session already installed. You can add Meteor's Session package by `meteor add session`.

That's it! Now you can use `Session.setPersistent` to set a session variable
that will save after a refresh.

If you'd like, you can have `Session.set` do this as well. See the Options
section below.

For Meteor 1.3+
---------------

If your app is using the imports syntax, the persistent-session package will work by simply importing Session where it is used. e.g - `import { Session } from 'meteor/session'`

Types
=====

1. Temporary Session Variable
  * matches current Meteor implementation
  * are not available after a  page reload

2. Persistent Session Variable
  * content is stored in the localstorage until it is cleared

3. Authenticated Session Variable
  * content is stored in the localstorage AND is cleared when a user logs out

Usage
=====

Setting Session Values
----------------------

* `Session.set(key, value)`
  * stores a session var according to the default_method (see Options)
* `Session.setTemp(key, value)`
  * stores a temporary session variable (non-persistent)
* `Session.setPersistent(key, value)`
  * store a persistent session variable (persistent)
* `Session.setAuth(key, value)`
  * stores a authenticated session variable (persistent + automatic deletion)

As of 3.3, you can use an object to set multiple values at once:

```javasript
Session.setPersistent({foo: "foo", bar: "bar"});
```

This works with all of the `set*` methods. All key/values set as an object
will have the same type of scoping (persistent/auth/temporary).

Updating Session Values
-----------------------

You can update the value of an existing session variable without changing or knowing its type.
Note: If you call update on an non-existent variable, it will be created as a temporary variable.

* `Session.update(key, value)`

Set Default
-----------

All of the `set()` functions have a `setDefault()` counterpart where the session variable will only be created if one doesn't already exist.
Note: None of the `setDefault()` commands will change the type of an existing session variable.

* `Session.setDefault(key, value)`
* `Session.setDefaultTemp(key, value)`
* `Session.setDefaultPersistent(key, value)`
* `Session.setDefaultAuth(key, value)`

Change Types
------------

Use these commands to change a session variable into a particular type.

* `Session.makeTemp(key)`
* `Session.makePersistent(key)`
* `Session.makeAuth(key)`

Clear Values
------------

* `Session.clear()`
  * destroys all session variables of all types
* `Session.clear(key)`
  * destroys a single session variable
* `Session.clearTemp()`
  * destroys all temporary session variables
* `Session.clearPersistent()`
  * destroys all persistent session variables
* `Session.clearAuth()`
  * destroys all authenticated session variables

Other
-----

These work the same as the current Meteor implementation:

* `Session.get(key)`
* `Session.equals(key, value)`

`ReactiveDict`'s `all` method is also supported.

Options
=======

To define the default type for session variables, set `persistent_session.default_method` to your preferred type in your
`config/settings.json` file:

```json
{
  "public": {
    "persistent_session": {
      "default_method": "your-preferred-type"
    }
  }
}
```

`persistent_session.default_method` can take one of the following values:
* `persistent`
* `authenticated`

In any other case the `default_method` will fall back to `temporary`


See EventedMind's screen on [organizing environment variables and settings](https://www.eventedmind.com/feed/meteor-organizing-environment-variables-and-settings)
for more information.

TODO
====

* Perhaps support saving session data in the URL ('setRoute' or something similar)

Contributing
============

Issues and Pull Requests are always welcome. Please read our [contribution guidelines](https://github.com/okgrow/guides/blob/master/contributing.md)

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
