import { View, Text, TouchableOpacity } from "react-native";

export default function PerguntaOpcoes({
    pergunta,
    resposta,
    onResponder
}) {

    return (

        <View>

            {pergunta.options.map((opcao) => {

                const selecionado = resposta === opcao;

                return (

                    <TouchableOpacity
                        key={opcao}
                        onPress={() => onResponder(opcao)}
                        style={{
                            backgroundColor: selecionado ? "#FBBF24" : "#1F2937",
                            borderWidth: 1,
                            borderColor: "#FBBF24",
                            borderRadius: 10,
                            padding: 15,
                            marginBottom: 12
                        }}
                    >

                        <Text
                            style={{
                                color: selecionado ? "#000" : "#FFF",
                                textAlign: "center",
                                fontWeight: "600"
                            }}
                        >
                            {opcao}
                        </Text>

                    </TouchableOpacity>

                );

            })}

        </View>

    );

}