# Discord Music Player

This discord music player, programmed entirely by Isaac J. Wallace, is a discord bot & application that is able to properly handle FFMPEG and youtube extraction integration to allow users to listen to music while in a discord call.

## Installation

Download and use [node](https://nodejs.org/en) to install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).

```bash
npm install --global yarn
```

You will then need to install [FFMPEG](https://www.ffmpeg.org/download.html) to your local machine as well as all yarn dependencies as follows:

```bash
yarn install
```

Once all the dependencies are downloaded, you must create a `.env` file in your filebase. Inside the ENV, you will input the following:

```env
TOKEN={Insert Discord Token Here}
CLIENT_ID={Insert Discord Client ID Here}
```

After all this is done, you can run the discord bot

```bash
yarn start
```

and enjoy some tunes!

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
