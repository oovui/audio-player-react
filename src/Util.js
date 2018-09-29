const Util = {
  timeFormat: function(seconds){
    var ss = parseInt(seconds)// 秒     
    var mm = 0 // 分        
    var hh = 0 // 小时        
    if (ss > 60) {         
      mm = parseInt(ss / 60)         
      ss = parseInt(ss % 60)       
    }        
    if (mm > 60) {         
      hh = parseInt(mm / 60)         
      mm = parseInt(mm % 60)        
    }        
    var result = ('00' + parseInt(ss)).slice(-2)      
    if (mm > 0) {          
      result = ('00' + parseInt(mm)).slice(-2) + ':' + result      
    } else {       
      result = '00:' + result     
    }       
    if (hh > 0) {        
      result = ('00' + parseInt(hh)).slice(-2) + ':' + result        
    }        
    
    return result
  }
}

export default Util;