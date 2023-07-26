import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { logOut } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logOut());
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>MERN Auth</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							{userInfo ? (
								<>
									<NavDropdown
										title={userInfo.name}
										id="username"
									>
										<LinkContainer to="/profile">
											<NavDropdown.Item>
												Profile
											</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item
											onClick={logoutHandler}
										>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<>
									<LinkContainer to="/login">
										<Nav.Link>
											<FaSignInAlt /> Sign In
										</Nav.Link>
									</LinkContainer>

									<LinkContainer to="/register">
										<Nav.Link>
											<FaSignOutAlt /> Sign Up
										</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
