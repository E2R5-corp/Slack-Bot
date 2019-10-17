const request = require('request');

const token = ''
const e2r5 = 'e2r5'
const e2r5_off = 'e2r5_off'

const addEmoji = (channel, timestamp, emoji = e2r5_off) => {
    return request.post('https://slack.com/api/reactions.add', {
        'auth': { 'bearer': token }, 'json': {
            'channel': channel,
            'name': emoji,
            'timestamp': timestamp
        }
    })
}

const followChannel = (channel) => {
    request.get('https://slack.com/api/channels.history?count=3&channel=' + channel + '&token=' + token, (e, r, b) => {
        const body = JSON.parse(b)
        body.messages.forEach(e => {
            if (!e.reactions || e.reactions.every((r) => { return r.name != e2r5_off }))
                addEmoji(channel, e.ts)
            setTimeout(() => {
                if (!e.reactions || e.reactions.every((r) => { return r.name != e2r5 }))
                    addEmoji(channel, e.ts, e2r5)
            }, 30);
        });
    })
}

setInterval(() => {
    followChannel('C039P7U6E')
    followChannel('CN3D33GRX')
    followChannel('C8Y2AQR6D')
}, 5000);
