var Nightmare = require('nightmare');
var Conf = require('config');

var mailgun = require('mailgun-js')({apiKey: Conf.get('mailgun.apikey'), domain: Conf.get('mailgun.domain')});

var email = {from: 'Excited User <me@samples.mailgun.org>',
    to: 'jchai@cafemedia.com',
    subject: 'hello problem with the ad',
    text: 'Problem with the ad!'
};


var n = new Nightmare()
    .goto(Conf.get('url'))
    .wait()
    .evaluate(function (selector) {return $(selector).html();},Conf.get('selector'))
    .then(function(text){
        if(text == 'hello'){

        }
        else{
            mailgun.messages().send(email, function (error, body) {
                console.log("shot email");
            });
        }
    })
;