import Datepicker from 'react-datepicker'

const SysHead = ({currentMails, handleInput}) => {
    return (
        <div className="systemHeader">
        <div className="mailContainer">
          <div className="datePickerStyle"> 
         <div className="dates"><Datepicker></Datepicker></div>
         <input type="text" name="search" onChange={handleInput} className="textInput"></input>
           <div className="searchBtn"></div>
           </div>
           <div className="mailResults">Results: <span>{currentMails}</span> mail(s)</div>
           </div>
        </div>

      );
}
 
export default SysHead;