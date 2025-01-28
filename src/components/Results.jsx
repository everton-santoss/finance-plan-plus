import styles from './Results.module.css';
import MyIconTop from '../assets/HandCoins.svg';
import MyIconDown from '../assets/TrendDown.svg';
import AddIcon from '../assets/add.svg';
import DimIcon from '../assets/Dim.svg';
import TrendDownIcon from '../assets/TrendDown.svg';
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Results = () => {
    const [isOpenModal, setIsModalOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const [transactions, setTransactions] = useState(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            return JSON.parse(storedTransactions).map((t) => ({
                ...t,
                date: t.date || new Date().toLocaleDateString('pt-BR'),

            }));
        }
        return [];
    });

    const [saldo, setSaldo] = useState(() => {
        const storedSaldo = localStorage.getItem('saldo');
        return storedSaldo ? parseFloat(storedSaldo) : 0;
    });

    const [formData, setFormData] = useState({
        type: '',
        value: '',
        description: '',
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('saldo', saldo.toString());
    }, [transactions, saldo]);

    const openModal = () => {
        setIsModalOpen(true); // Mostra o modal no DOM
        setTimeout(() => setIsTransitioning(true), 10); // Aguarda para aplicar as classes de transição //
    };
    const closeModal = () => {
        setIsTransitioning(false); // Remove a classe de transição //
        setTimeout(() => setIsModalOpen(false), 500); // Aguarda a transição terminar antes de desmontar //
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addTransaction = () => {
        const { type, value, description } = formData;
        const numericValue = parseFloat(value);

        if (!value || isNaN(numericValue)) {
            alert('Por favor, insira um valor válido.');
            return;
        }

        if (!description.trim()) {
            alert('Por favor, insira uma descrição.');
            return;
        }

        const newTransaction = {
            id: Date.now(),
            type,
            value: numericValue,
            description,
            date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date()),
        };

        setTransactions((prev) => [...prev, newTransaction]);

        if (type === 'Recebido') {
            setSaldo((prev) => prev + numericValue);
        } else if (type === 'Despesa') {
            setSaldo((prev) => prev - numericValue);
        }

        setFormData({ type: 'Recebido', value: '', description: '' });
        closeModal();
    };

    const removeTransaction = (id) => {
        const transactionToRemove = transactions.find((t) => t.id === id);
        if (!transactionToRemove) return;

        setTransactions((prev) => prev.filter((t) => t.id !== id));

        if (transactionToRemove.type === 'Recebido') {
            setSaldo((prev) => prev - transactionToRemove.value);
        } else if (transactionToRemove.type === 'Despesa') {
            setSaldo((prev) => prev + transactionToRemove.value);
        }
    };


    return (
        <>

            <div className={styles.container}>
                {isOpenModal && (
                    <div
                        className={`${styles.modal} ${isTransitioning ? styles.modalOpen : ''}`}
                        onClick={closeModal}
                    >
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <span className={styles.close} onClick={closeModal}>
                                &times;
                            </span>

                            <div className={styles.selects}>
                                <h3>Qual é sua transação?</h3>
                                <div className={styles.modalSelect}>
                                    <div>
                                        <input
                                            type="radio"
                                            id="recebido"
                                            name="type"
                                            value="Recebido"
                                            checked={formData.type === 'Recebido'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="recebido">Recebido</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="despesa"
                                            name="type"
                                            value="Despesa"
                                            checked={formData.type === 'Despesa'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="despesa">Despesa</label>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.valor}>

                                <label>Digite o valor :</label>
                                <input
                                    type="number"
                                    name="value"
                                    value={formData.value}
                                    onChange={handleInputChange}
                                    className={styles.labeldim}
                                    placeholder='Digite o valor...'
                                />

                                <label>Descrição : </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Descreva a transação..."
                                    className={styles.labeldesc}
                                />
                            </div>
                            <button className={styles.buttonAdd} onClick={addTransaction}>
                                Adicionar
                            </button>
                        </div>
                    </div>
                )}

                <div className={styles.separetor}>
                    <div className={styles.box}>
                        <div className={styles.teste1}>
                            <img src={MyIconTop} alt="" width={20} height={20} />
                        </div>
                        <div>
                            <p className={styles['p-results']}>Seu saldo</p>
                            <h3>R$ {saldo.toFixed(2)}</h3>
                        </div>
                    </div>

                    <div className={styles.box}>
                        <div className={styles.teste1}>
                            <img src={MyIconDown} alt="" width={20} height={20} />
                        </div>
                        <div>
                            <p className={styles['p-results']}>Gastos totais</p>
                            <h3>
                                -R${' '}
                                {transactions
                                    .filter((t) => t.type === 'Despesa')
                                    .reduce((sum, t) => sum + t.value, 0)
                                    .toFixed(2)}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className={styles.teste2}>
                    <div className={styles.teste}>
                        <button onClick={openModal} className={styles.buttonAddIns}>
                            <img src={AddIcon} alt="" width={10} height={10} />
                            Adicionar transação
                        </button>
                    </div>
                </div>
            </div >

            <div className={styles.sessao}>
                <h3>Suas transações</h3>
                {transactions.length === 0 ? (
                    <div className={styles.noTransaction}>
                        <h5>Não há transações no momento</h5>
                    </div>
                ) : (
                    <div className={styles.boxLi}>
                        <ul className={styles.list}>
                            {transactions.map((t) => (
                                <li key={t.id} className={styles.listItem}>
                                    <img
                                        src={t.type === 'Recebido' ? DimIcon : TrendDownIcon}
                                        alt={t.type}
                                        width={20}
                                        height={20}
                                    />
                                    <h4 className={styles.description}>{t.description}</h4>
                                    <p>{t.date}</p>
                                    <h5 className={t.type === "Recebido" ? styles.lissg : styles.lissr}>R${t.value.toFixed(2)}</h5>

                                    <div className={styles.testet}>
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeTransaction(t.id)}
                                        >
                                            <Trash2 width={20} height={20} className={styles.iconstyle} />
                                        </button>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div >
        </>
    );
};

export default Results;