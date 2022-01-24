/**
 * Nome metodo: getListaFasce
 * Descrizione: Metodo che permette di ottenere la lista delle fasce orarie prenotabili
 * Parametri: orari di apertura di una struttura
 * Return: lista di fasce orarie prenotabili
 * Autore : Giuseppe Scafa
 */

 exports.getListaFasce = (oraInizioMattina, oraFineMattina, oraInizioPomeriggio, oraFinePomeriggio, durataPerFascia) =>{
    let listaFasce = [];
    let inizioFascia, fineFascia; 
    fineFascia = oraInizioMattina;
    let minuti = fineFascia.slice(3,5);
        do{
            
            inizioFascia = fineFascia.slice(0,5);
            fineFascia = (parseInt(fineFascia.slice(0,2)) + durataPerFascia).toString().concat(":"+minuti);
           
            if(fineFascia > oraFineMattina.slice(0,5))
                fineFascia = oraFineMattina.slice(0,5);
            listaFasce.push(inizioFascia + "-" + fineFascia);
            
        }while(fineFascia != oraFineMattina.slice(0,5));
        

        fineFascia = oraInizioPomeriggio;
        minuti = fineFascia.slice(3,5);
        do{
            
            inizioFascia = fineFascia.slice(0,5);
            fineFascia = (parseInt(fineFascia.slice(0,2)) + durataPerFascia).toString().concat(":"+minuti);
           
            if(fineFascia > oraFinePomeriggio.slice(0,5))
                fineFascia = oraFinePomeriggio.slice(0,5);
            listaFasce.push(inizioFascia + "-" + fineFascia);

            
        }while(fineFascia != oraFinePomeriggio.slice(0,5));
        return listaFasce;
}