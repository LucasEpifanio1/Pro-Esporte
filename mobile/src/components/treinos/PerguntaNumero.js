import { TextInput } from "react-native";

export default function PerguntaNumero({

    resposta,
    onResponder

}){

    return(

        <TextInput

            keyboardType="numeric"

            value={resposta?.toString() ?? ""}

            onChangeText={onResponder}

            placeholder="Digite aqui"

            style={{

                backgroundColor:"#1F2937",

                color:"#FFF",

                padding:15,

                borderRadius:10,

                borderWidth:1,

                borderColor:"#FBBF24"

            }}

        />

    );

}