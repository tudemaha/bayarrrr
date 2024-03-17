const cron = require('node-cron');
const getNonPaidOffPayments = require('./get-payments');
const { sendMessageHandler } = require('./../controller/whatsapp-controller');

const createAndSendMessage = async (waClient) => {
	const payments = await getNonPaidOffPayments();
	payments.forEach((payment) => {
		let message = `Halo ${payment.name}!\n` +
			`Semoga dalam keadaan sehat selalu😇️\n\n` +
			`Berikut adalah rincian *${payment.description}* mu:\n`;

		payment.items.forEach((item, idx) => {
			message += `   ${idx + 1}. ${item.name}: Rp${item.price.toLocaleString('id-ID')}\n`
		})

		message += `*Total: Rp${payment.total.toLocaleString('id-ID')}*\n\n`

		if(payment.payments.length !== 0) {
			message += `Berikut adalah rincian pembayaran yang telah dilakukan:\n`
			payment.payments.forEach((pay, idx) => {
				message += `   ${idx + 1}. ${pay.date.getDate()}/${pay.date.getMonth() + 1}/${pay.date.getFullYear()}: Rp${pay.amount.toLocaleString('id-ID')}\n`
			})
		}

		message += `💥️ *Sisa: Rp${payment.remains.toLocaleString('id-ID')}* 💥️\n\n`
		message += 'Mohon segera dilunasi nggih😃️\n\n'

		message += '_This message was sent by bot._'

		sendMessageHandler({
			msg: message,
			number: payment.wa,
			client: waClient,
		});
	})
}

const scheduleMessage = (waClient) => {
	cron.schedule('*/5 * * * *', () => createAndSendMessage(waClient), { timezone: "Asia/Makassar" })
}

module.exports = scheduleMessage;