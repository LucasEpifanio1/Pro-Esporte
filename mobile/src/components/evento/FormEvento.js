import { View, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import CampoTexto from '../CampoTexto';
import BotaoCriarConta from '../BotaoCriarConta';
import CampoDataHora from '../CampoDataHora';

export default function FormEvento({
    onSubmit,
    loading
}) {

    const [titulo, setTitulo] = useState('');
    const [modalidade, setModalidade] = useState('');
    const [local, setLocal] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [vagas, setVagas] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [mostrarDataPicker, setMostrarDataPicker] = useState(false);
    const [mostrarHoraPicker, setMostrarHoraPicker] = useState(false);

    function enviarFormulario() {
        onSubmit({
            titulo,
            modalidade,
            local,
            data,
            horario,
            vagas: Number(vagas),
            descricao,
            imagem
        });
    }

    function formatarDataSelecionada(dataSelecionada) {
        const ano = dataSelecionada.getFullYear();
        const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
        const dia = String(dataSelecionada.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    function formatarHoraSelecionada(horaSelecionada) {
        const horas = String(horaSelecionada.getHours()).padStart(2, '0');
        const minutos = String(horaSelecionada.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    return (
        <View>

            <CampoTexto
                label="Título"
                placeholder="Nome do evento"
                value={titulo}
                onChangeText={setTitulo}
            />

            <CampoTexto
                label="Modalidade"
                placeholder="Ex: Corrida"
                value={modalidade}
                onChangeText={setModalidade}
            />

            <CampoTexto
                label="Local"
                placeholder="Onde acontecerá?"
                value={local}
                onChangeText={setLocal}
            />

            <View>
                <CampoDataHora
                    label="Data"
                    placeholder="Selecione a data"
                    valor={data}
                    onPress={() =>
                        setMostrarDataPicker(true)
                    }
                />

                {
                    mostrarDataPicker && (
                        <DateTimePicker
                            value={
                                data
                                    ? new Date(data)
                                    : new Date()
                            }
                            mode="date"
                            minimumDate={new Date()}
                            onChange={(event, selectedDate) => {

                                setMostrarDataPicker(false);

                                if (selectedDate) {
                                    setData(
                                        formatarDataSelecionada(
                                            selectedDate
                                        )
                                    );
                                }

                            }}
                        />
                    )
                }
            </View>

            <View>
                <CampoDataHora
                    label="Horário"
                    placeholder="Selecione o horário"
                    valor={horario}
                    onPress={() =>
                        setMostrarHoraPicker(true)
                    }
                />

                {
                    mostrarHoraPicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            is24Hour={true}
                            onChange={(event, selectedTime) => {

                                setMostrarHoraPicker(false);

                                if (selectedTime) {
                                    setHorario(
                                        formatarHoraSelecionada(
                                            selectedTime
                                        )
                                    );
                                }

                            }}
                        />
                    )
                }
            </View>

            <CampoTexto
                label="Número de vagas"
                placeholder="50"
                keyboardType="numeric"
                value={vagas}
                onChangeText={setVagas}
            />

            <CampoTexto
                label="Descrição"
                placeholder="Descrição do evento"
                value={descricao}
                onChangeText={setDescricao}
            />

            <CampoTexto
                label="Imagem (URL)"
                placeholder="https://..."
                value={imagem}
                onChangeText={setImagem}
            />

            <BotaoCriarConta
                titulo={
                    loading
                        ? 'Criando...'
                        : 'Criar Evento'
                }
                onPress={
                    loading
                        ? null
                        : enviarFormulario
                }
            />

        </View>
    );
}