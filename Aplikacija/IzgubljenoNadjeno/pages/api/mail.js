import { mailOptions, transporter } from "../../config/nodemailer";

const handler = async (req, res) => {

    if (req.method === "POST") {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ message: 'Bad request' });
        }

        try {

            await transporter.sendMail({
                ...mailOptions,
                to: data,
                subject: "Nove poruke",
                text: "test",
                html: `<h1>Izgubljeno/Nađeno</h1><p>Pozdrav!<br />Imate neprocitanih poruka!</p>`
            })
            return res.status(200).json({ success: true });
        } catch (error) {
            console.log(data);
            return res.status(400).json({ message: error.message });
        }
    }

    return res.status(400).json({ message: 'Bad request' });
};

export default handler;