import styled from "styled-components";

export function Loading() {
	//TODO:build a loading spinner
	return <LoadingStyle>Loading...</LoadingStyle>;
}
const LoadingStyle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;
