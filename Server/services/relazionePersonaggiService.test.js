jest.mock("../models/relazionePersonaggi");
const relazionePersonaggiService=require("./relazionePersonaggiService");
const {faker}=require("@faker-js/faker");
const relazionePersonaggi=require("../models/relazionePersonaggi");


describe("relazionePersonaggiService",()=>{
    describe("createRelazionePersonaggi",()=>{
        it("dovrebbe fallire se i dati non sono presenti",async () => {
            await expect(relazionePersonaggiService.createRelazionePersonaggi(null)).rejects.toBe("Dati non validi");
        })

        it("dovrebbe fallire se l'ID contesto non è valido",async ()=>{
            let mockDati={
                descrizione:"Placeholder",
                fkContesto:-1,
                fkPersonaggio1:1,
                fkPersonaggio2:2
            };
            await expect(relazionePersonaggiService.createRelazionePersonaggi(mockDati)).rejects.toBe("ID contesto non valido");
        })

        it("dovrebbe fallire se gli ID di Personaggio1 e Personaggio2 non sono validi",async ()=>{
            let mockDati={
                descrizione:"Placeholder",
                fkContesto:1,
                fkPersonaggio1:-1,
                fkPersonaggio2:-2
            };
            await expect(relazionePersonaggiService.createRelazionePersonaggi(mockDati)).rejects.toBe("ID personaggi non validi");
        })

        it("dovrebbe fallire se gli ID di Personaggio1 e Personaggio2 sono uguali",async ()=>{
            let mockDati={
                descrizione:"Placeholder",
                fkContesto:1,
                fkPersonaggio1:1,
                fkPersonaggio2:1
            };
            await expect(relazionePersonaggiService.createRelazionePersonaggi(mockDati)).rejects.toBe("ID personaggi non validi");
        })

        it("dovrebbe fallire se la descrizione è troppo corta",async ()=>{
            let mockDati={
                descrizione:"a",
                fkContesto:1,
                fkPersonaggio1:1,
                fkPersonaggio2:2
            };
            await expect(relazionePersonaggiService.createRelazionePersonaggi(mockDati)).rejects.toBe("Lunghezza della descrizione non valida");
        })

        it("dovrebbe fallire se la descrizione è troppo lunga",async ()=>{
            let mockDati={
                descrizione:faker.lorem.words(255),
                fkContesto:1,
                fkPersonaggio1:1,
                fkPersonaggio2:2
            };
            await expect(relazionePersonaggiService.createRelazionePersonaggi(mockDati)).rejects.toBe("Lunghezza della descrizione non valida");
        })

        it("dovrebbe fallire se la creazione della relazione fallisce",async ()=>{
            let mockDati={
                descrizione:"Descrizione",
                fkContesto:1,
                fkPersonaggio1:1,
                fkPersonaggio2:2
            };
            relazionePersonaggi.createRelazionePersonaggi.mockResolvedValue(null);
            await expect(relazionePersonaggiService.createRelazionePersonaggi(mockDati)).rejects.toBe("Creazione relazione tra personaggi fallita");
        })

        it("dovrebbe creare correttamente la relazione",async ()=>{
            let mockDati={
                descrizione:"Descrizione",
                fkContesto:1,
                fkPersonaggio1:1,
                fkPersonaggio2:2
            };
            relazionePersonaggi.createRelazionePersonaggi.mockResolvedValue({});
            await expect(relazionePersonaggiService.createRelazionePersonaggi(mockDati)).resolves.toBeDefined();
        })
    })
})