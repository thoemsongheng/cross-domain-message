## Cross domain messaging

1. Sender domain

- in this example run the app on port 3002
- how its work? basically create a iframe embed the target url and use postMessage() to send the message and grab the message then save it to local storage by recevier domain.

2. Receiver domain

- in this example run the app on port 3003
- on this domain listening to the message event and grab the message then save it to local storage.
