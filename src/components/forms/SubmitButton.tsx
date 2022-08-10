import { MouseEventHandler } from 'react';

interface SubmitButtonProps {
	title: string;
	handleSubmit: MouseEventHandler<HTMLButtonElement>;
	values: any;
	errors: any;
	keys: string[];
	allRequired: boolean;
}

export default function SubmitButton(props: SubmitButtonProps) {
	const { title, handleSubmit, values, errors, keys, allRequired } = props;

	const disabled = !(
		keys.every((e) => { return errors[e] == undefined; })
		&&
		keys.some((e) => { return (values[e] != undefined); })
		&&
		(!allRequired || keys.every((e) => { return (values[e] != undefined); }))
	);

	return (
		<button
			type="submit"
			className={`w-100 btn btn-lg btn-dark`}
			onClick={handleSubmit}
			onKeyPress={(e) => { console.log(e); handleSubmit }}
			disabled={disabled}>
			{title}
		</button>
	);
}