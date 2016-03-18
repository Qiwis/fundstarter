var http = require('http');
var fs = require('fs');
var file = 'index.html';

var readHtml = function(callback) {
    fs.readFile('index.html', 'utf8', function(err, content) {
        if (err) {
            return callback(err);
        } else {
            callback(null, content);
        }
    })
};

var readHtmlBuffer = function(callback) {
    fs.open(file, 'r', function(err, fd) {
        fs.fstat(fd, function (err, stats) {
            if (err) {
                return callback(err);
            } else {
                var buffer_size = stats.size,
                    chunk_size = 512, buffer = new Buffer(buffer_size),
                    byte_read = 0;
                console.log(file + " " + buffer_size);
                while (byte_read < buffer_size) {
                    if ((byte_read + buffer_size) > buffer_size) {
                        chunk_size = (buffer_size - byte_read);
                    }
                    fs.read(fd, buffer, byte_read, chunk_size, byte_read);
                    byte_read += chunk_size;
                }
                callback(null, buffer);
            }
        })
    });
};

var server = http.createServer(function (req, res) {

    /* part 1a old */
    /*
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {"Content-Type": "index.html", "Content-Length":data.length})
        res.write(data)
        res.end()
    })
    */

    /* part 1a new */
    /*
    readHtml( function(err, content) {
        res.writeHead(200, {"Content-Type": "index.html", "Content-Length": content.length});
        res.write(content);
        res.end();
    });
    */

    /* part 1b */
    /*
    var asynchRead = fs.readFileSync('index.html', 'utf8')
    res.write(asyncRead)
    res.end()
    */

    /* part 2 old */
    /*
    fs.open(file, 'r', function(err, fd) {
        fs.fstat(fd, function(err, stats) {
            var buffer_size = stats.size,
                chunk_size = 512,
                buffer = new Buffer(buffer_size),
                byte_read = 0;
            console.log(file + " " + buffer_size);
            while (byte_read < buffer_size) {
                if((byte_read + chunk_size) > buffer_size) {
                    chunk_size = (buffer_size - byte_read);
                }
                fs.read(fd, buffer, byte_read, chunk_size, byte_read);
                byte_read += chunk_size;
            }
            console.log(buffer.toString('utf8', 0, buffer_size));
            res.write(buffer.toString('utf8', 0, buffer_size));
            res.end();
        });
    });
    */
    /* part 2 new */
    readHtmlBuffer( function(err, buffer) {
        var buffer_size = buffer.size;
        console.log(buffer.toString('utf8', 0, buffer_size));
        res.write(buffer.toString('utf8', 0, buffer_size));
        res.end();
    });

});

server.listen(process.env.PORT || 8080);
console.log("http://127.0.0.1:8080/");
