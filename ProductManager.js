
  class TicketManager {
    #aprecioBaseDeGanacia = 1.15;

  constructor() {
    this.eventos= [];
    // this.products = [];
  }


  addEvento = (nombre, lugar, precio) => {

    let candEventos = this.eventos.length;

    if(!nombre || !lugar || !precio){
      return 'Todos lo datos son requeridos'
    }

    const eventoLugar = this.eventos.find(evento => evento.lugar == lugar);

    if (eventoLugar) {
      return `El evento ya existe en: ${lugar}`;
    }

    const evento = {
      nombre, 
      lugar,
      precio: precio*this.#aprecioBaseDeGanacia,
      capacidad: 50,
      fecha: Date(),
      partipantes: [],
      id: ++candEventos
    }
    this.eventos.push(evento);

    return this.eventos; 
  }

  getEventos = () =>{
    return this.eventos;
  }

  getEvento = (idEvento) => {
    const evento = this.eventos.find( evento => evento.id == idEvento );
    if(evento){
      return evento;
    }else{
      return 'Not found'
    }
  }
    addParticipante = (idEvento, idParticipante)=>{
    const evento = this.getEvento(idEvento);
    if(evento === 'Not found'){
      return 'El evento no existe';
    }

    const registro = evento.partipantes.find(idPersona => idPersona == idParticipante);

    if(registro){
      return `El participante ${idParticipante} ya compro entradas`;
    }
    evento.partipantes.push(idParticipante);
    return evento;
  }
}

  const ticketManager = new TicketManager();

  // let evento = ticketManager.getEvento(1);
  let evento = ticketManager.addEvento('Baradero Rock','Bradero', 5000);
  evento = ticketManager.addEvento('Baradero Rock','San pedro', 5000);
  // console.log(evento);
  console.log('--------------------------')
  console.log('--------------------------')

  // console.log('evento: ', evento);
  const unEvento = ticketManager.getEvento(2);

  // console.log(unEvento);
  let user = ticketManager.addParticipante(1,1)
  console.log(user);
  user = ticketManager.addParticipante(1,2)
  console.log(user);
  user = ticketManager.addParticipante(1,2)
  console.log(user);
  
