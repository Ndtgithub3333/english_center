import Header from '~/components/Layout/components/Header'

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div style={{height: '100vh'}} className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;