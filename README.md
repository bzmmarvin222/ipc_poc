# Inter Process Communication
A proof of concept to communicate between an dotnet core console application and an electron app with an angular6 frontend running under the hood.

## Required
- .NetCore
- NodeJs
- npm

## Getting started
1. go to client and run `npm install`
2. go to server and run `dotnet run`
3. go to client again and run `npm start`

You can now send messages from the server command line to the UI inside the electron app. 