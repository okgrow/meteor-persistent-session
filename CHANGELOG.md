### Master [changes](https://github.com/okgrow/meteor-persistent-session/compare/v0.4.3...master)

### [0.4.3](https://github.com/okgrow/meteor-persistent-session/compare/v0.4.2...v0.4.3)

 * Fix #48 - console.log messages (Reported by [themeteorchef](https://github.com/themeteorchef)

### [0.4.2](https://github.com/okgrow/meteor-persistent-session/compare/v0.4.1...v0.4.2)

 * Fix `Session.clear` issues, #42/#44 [PR #46](https://github.com/okgrow/meteor-persistent-session/pull/46) by [mhinton](https://github.com/mhinton)
 * Fix #37 - Values turned into strings (Reported by [lorensr](https://github.com/lorensr))
 * Fix #45 - 0.3.5 and 0.4.\* are incompatible (Reported by [freiit](https://github.com/freiit))

### [0.4.1](https://github.com/okgrow/meteor-persistent-session/compare/v0.4.0...v0.4.1)

 * Fix reference error in `PersistentSession.equals` [PR #39](https://github.com/okgrow/meteor-persistent-session/pull/39) by [ryepdx](https://github.com/ryepdx)
 * Changed quotes to valid JSON [PR #40](https://github.com/okgrow/meteor-persistent-session/pull/40) by [aramk](https://github.com/aramk)

### [0.4.0](https://github.com/okgrow/meteor-persistent-session/compare/v0.3.4...v0.4.0)

 * Revert 6e4b58d
 * Add a weak dependency on `accounts-base`, fixes #9 (Reported by [aadamsx](https://github.com/aadamsx) and [afoda](https://github.com/afoda))
 * Added tests [PR #33](https://github.com/okgrow/meteor-persistent-session/pull/33) by [RobertLowe](https://github.com/RobertLowe)
 * Use `Tracker.autorun` to detect logout, rather than monkey-patching `Meteor.logout` [PR #33](https://github.com/okgrow/meteor-persistent-session/pull/33) by [RobertLowe](https://github.com/RobertLowe)
 * Permit namespacing and instantiation of custom PersistentSessions [PR #33](https://github.com/okgrow/meteor-persistent-session/pull/33) by [RobertLowe](https://github.com/RobertLowe)
 * Add support for `ReactiveDict`'s `all` and `equals` [PR #33](https://github.com/okgrow/meteor-persistent-session/pull/33) by [RobertLowe](https://github.com/RobertLowe)
 * Do not stringify values (amplify already does), fixes #31 [PR #35](https://github.com/okgrow/meteor-persistent-session/pull/35) by [mike182uk](https://github.com/mike182uk)

### [0.3.4](https://github.com/okgrow/meteor-persistent-session/compare/v0.3.3...v0.3.4)

 * Don't try to parse values that weren't explicitly set through Session, fixes #24 (Reported by [tcastelli](https://github.com/tcastelli))

### [0.3.3](https://github.com/okgrow/meteor-persistent-session/compare/v0.3.2...v0.3.3)

 * Support `Session.set` taking an object parameter [PR #25](https://github.com/okgrow/meteor-persistent-session/pull/25)

### [0.3.2](https://github.com/okgrow/meteor-persistent-session/compare/v0.3.1...v0.3.2)

 * Add dependance on ejson package, fixes #22 [PR #23](https://github.com/okgrow/meteor-persistent-session/pull/23) by [djhi](https://github.com/djhi)

### [0.3.1](https://github.com/okgrow/meteor-persistent-session/compare/v0.3.0...v0.3.1)

 * Fix issue with trying to evaluate unparsed EJSON value

### [0.3.0](https://github.com/okgrow/meteor-persistent-session/compare/v0.2.2...v0.3.0)

 * Changed `default_method` to "temporary", fixes #15 ([pull request #16](https://github.com/okgrow/meteor-persistent-session/pull/16) by [aramk](https://github.com/aramk))
 * Store values as EJSON, fixes #17 (Reported by [jamesgibson14](https://github.com/jamesgibson14))

### [0.2.2](https://github.com/okgrow/meteor-persistent-session/compare/v0.2.1...v0.2.2)

 * Handle case where a persistent value is set to 0 (Reported by [IndigoStarfish](https://github.com/IndigoStarfish))

### [0.2.1](https://github.com/okgrow/meteor-persistent-session/compare/v0.2.0...v0.2.1)

 * Fix typos

### [0.2.0](https://github.com/okgrow/meteor-persistent-session/compare/v0.1.4...v0.2.0)

 * Complete Overhaul
 * Convert package format to 0.9.0 Unipackage

### [0.1.4](https://github.com/okgrow/meteor-persistent-session/releases/tag/v0.1.4)

 * Fixed `Session.getDefault` (Reported by [valZho](https://github.com/valZho))
 * Fixed `Session.equals` (Reported by [manuelpaulo](https://github.com/manuelpaulo))
 * Fixed configuration example in README.md

### [0.1.3](https://github.com/okgrow/meteor-persistent-session/releases/tag/v0.1.3)

 * Initial release
