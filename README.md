# Doorbot.ts

Allows access to something (like a door lock) by authenticating through 
something else (like an RFID reader or pin pad).

This module isn't particularly useful by itself. You'll need supporting modules
to run this on (for example) the Raspberry Pi and to interface with Wiegand 
readers.

## Setup

After cloning from github, run `npm install .` to install the prereqs. You can 
run the tests with `npm test`.

## Architechtural Overview

There are three main components: Reader, Authenticator, and Activator. The 
Reader interfaces with some device that is meant to allow access, such as a 
Wiegand RFID reader or a pin pad (or maybe both). The data from that is then 
passed through a ReadData object to an Authenticator. The auth portion checks 
if the given input should be allowed or not. If it is, the Activator will 
do a thing, such as triggering a GPIO pin on a Raspberry Pi to unlock the door.

This makes heavy use of Promises so that everything is done asynchronously. 
Async is important for maintaining low latency.
