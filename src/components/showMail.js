const MailContent = ({data, showBody}) => {

    const { from, subject, text } = data
    
    return ( 
        <div className="mailContent">
            <div className="closeEmail" onClick={()=>{showBody(false)}}>X</div>
            <div className="mailHeader">
              <h2>This is the Mail Content</h2>
                <p><span>From:</span> {from}</p>
                <p><span>Subject:</span> {subject}</p>
            </div>
            <div className="mailcontenInfo">
                <p>{text}</p>
            </div>
        </div>
     );
}
 
export default MailContent;