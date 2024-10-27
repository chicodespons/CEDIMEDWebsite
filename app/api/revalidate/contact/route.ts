import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!; // Ensure the secret key is loaded from the environment

const EMAIL_HOST = process.env.EMAIL_HOST!;
const EMAIL_PORT = process.env.EMAIL_PORT!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

export async function POST(request: Request) {

    console.log("Received request!!!")
    try {
        const body = await request.json();
        const { firstName, lastName, email, tel, message, recaptchaToken } = body;

        if (!recaptchaToken){
            return NextResponse.json({ error : "reCAPTCHA token is missing"}, {status: 400});
        }

        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
        const reCaptchaRes = await fetch(verificationUrl, {
            method: "POST",
        });

        const reCaptchaData = await reCaptchaRes.json();

        if (!reCaptchaData.success){
            return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400});
        }

        // If reCAPTCHA is successful, proceed with form processing

        const transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            port: Number(EMAIL_PORT),
            secure: false,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: EMAIL_USER,
            to: "info@cedimed.brussels",
            subject: "New Contact Form Submission",
            text: `You have received a new contact form submission from ${firstName} ${lastName}.
            
            Email: ${email}
            Tel : ${tel || "Not provided"}
            Message: ${message}`
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Form submitted successfully!', data: { firstName, lastName, email, tel, message } }, { status: 200 });
    
    } catch (error) {
        console.error("Error handling contact form: ", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}