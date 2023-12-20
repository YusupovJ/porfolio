import React, { memo } from "react";
import { Wrapper } from "./style";
import { Fade } from "react-awesome-reveal";
import { useAsync } from "src/helpers/hooks";
import { Button, Input } from "src/shared/UI";
import Form from "src/shared/Form";
import Tag from "../Tag";

/* Компонент для отправки сообщения на почту */

const URL = "https://api.emailjs.com/api/v1.0/email/send";

const ContactForm: React.FC = () => {
	const { send, status } = useAsync(URL, "POST", "application/json");

	const submit = (values: any) => {
		console.log(values);
		send({
			template_id: process.env.template_id,
			user_id: process.env.user_id,
			service_id: process.env.service_id,
			template_params: {
				...values,
				send_to: "jamshudanamana@gmail.com",
			},
		});
	};

	return (
		<Wrapper>
			<Tag tagName="form" noWriteTag>
				<Form className="form-wrapper" submit={submit}>
					<Fade direction="up" className="form-input">
						<Input
							variant="email"
							placeholder="Email"
							required
							validate="email"
							name="email"
						/>
					</Fade>
					<Fade direction="up" className="form-textarea">
						<Input placeholder="Message" name="message" textArea />
						<Button status={status}>Send message</Button>
					</Fade>
				</Form>
			</Tag>
		</Wrapper>
	);
};

export default memo(ContactForm);
