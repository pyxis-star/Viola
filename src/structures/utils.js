const Viola = {}

Viola.github = 'https://github.com/pyxis-star/Viola/'

Viola.time = function formatDate(template, date) {
            var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
            date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
            return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
                return template.split(specs[i]).join(item)
            }, template)
        }

Viola.clean = function clean(text) {
			const blankSpace = String.fromCharCode(8203)
			return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
		};

Viola.arts = [`[\`シエラ\`](https://www.pixiv.net/en/artworks/74257065)`]

module.exports = Viola
