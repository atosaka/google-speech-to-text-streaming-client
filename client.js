const { program } = require("commander");
const fs = require("fs");
const speech = require('@google-cloud/speech');
const memory = require("memory-streams");

function main() {
    program
        .option("-i, --input <input>", "input file")
        .parse();
    const options = program.opts();
    if (!options.input) {
        console.error("specify a input wav file");
        return;
    }

    const client = new speech.SpeechClient();
    const request = {
        config: {
            encoding: "LINEAR16",
            sampleRateHertz: 16000,
            languageCode: "ja-JP",
	    model: "default",
        },
        singleUtterance: false,
        interimResults: true, // If you want interim results, set this to true
    };
    const recognizeStream = client
          .streamingRecognize(request)
          .on("error", console.error)
          .on("data", data => {
              if (data.results[0] && data.results[0].alternatives[0]) {
                  const transcript = data.results[0].alternatives[0].transcript;
                  const isFinal = data.results[0].isFinal;
                  console.log(`(${isFinal? "t": "f"}) ${transcript}`);
              }
              else {
                  console.log(`GCP Reached transcription time limit!`);
              }
          })
    ;

    const memReader = new memory.ReadableStream("");
    memReader.pipe(recognizeStream, { end: true });

    const stream = fs.createReadStream(options.input, { highWaterMark: 1024 * 1024 });
    stream
        .on('data', data => {
            memReader.append(data);
        })
        .on('end', () => {
            memReader.append(null);
        });
}

main();
