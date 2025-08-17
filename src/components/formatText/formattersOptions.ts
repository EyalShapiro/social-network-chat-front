export const formattersOptions: FormatOptionType[] = [
	{
		// מחליף טקסט בין כוכביות (**) ל-HTML של טקסט מודגש

		tag: "b",
		format: "bold",
		charFormt: "**",
		keyboardCharEvent: "*",
		ctrlKeyEvent: "b",
		text: "bold",
		tooltip: "מודגש",
	},
	{
		// מחליף טקסט בין קווים תחתונים (__) ל-HTML של טקסט מודגש (הדגשה)

		tag: "ins",
		format: "underline",
		charFormt: "__",
		keyboardCharEvent: "_",
		ctrlKeyEvent: "u",
		text: "underline",
		tooltip: "קו תחתון",
	},
	{
		// מחליף טקסט בין קווים (--) ל-HTML של טקסט עם קו חוצה

		tag: "strike",
		format: "strike",
		charFormt: "--",
		keyboardCharEvent: "-",
		ctrlKeyEvent: "d",
		text: "strike",
		tooltip: "מחוק",
	},
	{
		// מחליף טקסט בין סימני גרשיים (~~) ל-HTML של טקסט נטוי

		tag: "i",
		format: "italic",
		charFormt: "~~",
		keyboardCharEvent: "~",
		ctrlKeyEvent: "i",
		text: "italic",
		tooltip: "נטוי",
	},

	{
		// מחליף טקסט בין חצאים (^^) ל-HTML של טקסט מודגש עם רקע

		tag: "mark",
		format: "mark",
		charFormt: "^^",
		keyboardCharEvent: "^",
		ctrlKeyEvent: "h",
		text: "mark",
		tooltip: "סימן",
	},
];

export interface FormatOptionType {
	tag: string;
	format: string;
	charFormt: string;
	keyboardCharEvent: string;
	ctrlKeyEvent: string;
	// SvgElement: React.FC<React.SVGProps<SVGSVGElement>>;
	text: string; //TODO:להחליף ICON
	tooltip?: string;
}
