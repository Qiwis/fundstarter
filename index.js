var http = require('http')
var fs = require('fs')
var file = 'index.html'

var server = http.createServer(function (req, res) {
    /* part 1a */
    /*
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {"Content-Type": "index.html", "Content-Length":data.length})
        res.write(data)
        res.end()
    })
    */
    /* part 1b */
    /*
    var asynchRead = fs.readFileSync('index.html', 'utf8')
    */
    /* part 2 */
    fs.open(file, 'r', function(err, fd) {
        fs.fstat(fd, function(err, stats) {
            var s = stats.size,
                chunkSize = 512,
                buffer = new Buffer(s),
                byteRead = 0
            console.log(file + " " + s)
            while (byteRead < s) {
                if((byteRead + chunkSize) > s) {
                    chunkSize = (s - byteRead)
                }
                fs.read(fd, buffer, byteRead, chunkSize, byteRead)
                byteRead += chunkSize
            }
            console.log(buffer.toString('utf8', 0, s))
            res.write(buffer.toString('utf8', 0, s))
            res.end()
            })
        })
    })

server.listen(process.env.PORT || 8080)
console.log("http://127.0.0.1:8080/")
