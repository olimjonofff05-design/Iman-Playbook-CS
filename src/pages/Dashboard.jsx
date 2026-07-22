import "./Dashboard.css";

function Dashboard(){

    return(

        <div className="dashboard">

            <h1>Welcome to IMAN Playbook</h1>

            <p>
                Customer Support Knowledge Base
            </p>

            <div className="cards">

                <div className="card">
                    <h3>🛒 BNPL</h3>
                    <p>FAQ, Process, Scripts</p>
                </div>

                <div className="card">
                    <h3>💰 Invest</h3>
                    <p>Investment documentation</p>
                </div>

                <div className="card">
                    <h3>🏪 Merchant</h3>
                    <p>Partner instructions</p>
                </div>

                <div className="card">
                    <h3>📄 Offer</h3>
                    <p>Public offer documents</p>
                </div>

                <div className="card">
                    <h3>📞 Scripts</h3>
                    <p>Operator scripts</p>
                </div>

                <div className="card">
                    <h3>❓ FAQ</h3>
                    <p>Frequently asked questions</p>
                </div>

            </div>

        </div>

    )

}

export default Dashboard;