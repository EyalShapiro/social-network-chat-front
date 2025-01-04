import styled from "styled-components";
import { useNavigate } from "react-router";

import ViewMsgChat from "@/components/ViewMsgChat";
import { getUserName, removeUserName } from "@/utils/LocalStorageFunction";
export default function Chat() {
	const navigate = useNavigate();

	const userName = getUserName();

	const handleLogout = () => {
		removeUserName();
		navigate("/");
	};
	if (!userName) {
		navigate("/");
		return null;
	}
	return (
		<>
			<UsernameDisplayContainer>
				<span>{userName}</span>
				<button className="logout" onClick={handleLogout}>
					Logout
				</button>
			</UsernameDisplayContainer>
			<ViewMsgChat username={userName} />
		</>
	);
}
const UsernameDisplayContainer = styled.div`
	position: absolute;
	right: 40px;
	top: 40px;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	font-size: 16px;
	font-weight: bold;
	color: white;
	background-color: #333;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px 20px;
	& span {
		color: white;
		&:hover {
			color: lightcyan;
		}
	}
	& button.logout {
		padding: 5px 10px;
		background-color: #f44336;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: #d32f2f;
		}
	}
`;
