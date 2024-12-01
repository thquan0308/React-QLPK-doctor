import { useSelector } from 'react-redux'
import './css.css'
const Header = () => {
    const user = useSelector(state => state.accountDoctor.user)

    return (
        <>
        <div className="rts-header-one-area-one">                                  
            <div className="rts-header-nav-area-one header--sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="logo-search-category-wrapper">
                            <a href="index.html" className="logo-area">
                            <img src="assets/images/logo/logo-01.svg" alt="logo-main" className="logo" />
                            </a>
                            <div class="marquee">
                                <div class="marquee-text">
                                Xin chào bác sĩ <span style={{color: "blue"}}>&nbsp;{user?.lastName} {user?.firstName}</span>
                                </div>
                            </div>                            
                            <div className="actions-area">
                            <div className="search-btn" id="searchs">
                                <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z" fill="#1F1F25" />
                                </svg>
                            </div>
                            <div className="menu-btn" id="menu-btn">
                                <svg width={20} height={16} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y={14} width={20} height={2} fill="#1F1F25" />
                                <rect y={7} width={20} height={2} fill="#1F1F25" />
                                <rect width={20} height={2} fill="#1F1F25" />
                                </svg>
                            </div>
                            </div>
                            <div className="accont-wishlist-cart-area-header">
                            {/* <a href="/doctor" className="btn-border-only account">
                                <i className="fa-light fa-user" />
                                <span>Account</span>
                            </a> */}
                            {/* <a href="wishlist.html" className="btn-border-only wishlist">
                                <i className="fa-regular fa-heart" />
                                <span className="text">Wishlist</span>
                                <span className="number">2</span>
                            </a>                            */}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default Header