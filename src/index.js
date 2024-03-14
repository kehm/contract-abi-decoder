import { ethers } from 'ethers';
import abi from '../abi.json' assert { type: "json" };

const encodeInputParams = () => {
    console.log('Encoding input parameters...');
    const types = ['address', 'uint256'];
    const values = ['0xF0774151eF0162E533a4966d21DF54d8E627B24E', 1000000000000000];
    const data = ethers.AbiCoder.defaultAbiCoder().encode(types, values);
    console.log('Data: ' + data);
    console.log();
}

encodeInputParams();

const decodeTxData = () => {
    console.log('Decoding transaction data...');
    const tx = new ethers.Interface(abi).parseTransaction({
        data: '0x23b872dd000000000000000000000000381cf7a359cfb6a77163554ad333ce0e1cdfe1300000000000000000000000008917cf2a57df39d311a96c53fcca76dafb25392b0000000000000000000000000000000000000000000000000000000000000001',
        value: 0,
    });
    console.log('Function: ' + tx.name);
    console.log('Signature: ' + tx.signature);
    for (let i = 0; i < tx.args.length; i++) {
        console.log('Arg' + i + ': ' + tx.args[i]);
    }
    console.log();
}

decodeTxData();

const decodeEventTopics = () => {
    console.log('Decoding event topics...');
    const types = [
        'address',
        'address',
        'uint256',
    ];
    const topics = [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000ba6868483326275cce163dceb40bc20fe59f11d0',
        '0x0000000000000000000000005a86ca02df27456a23c47682835bd3b80f87b3a5',
        '0x00000000000000000000000000000000000000000000000000000000000000a7',
    ];
    topics.forEach((topic, index) => {
        if (index === 0) {
            const eventSignatureHash = ethers.keccak256(ethers.toUtf8Bytes('Transfer(address,address,uint256)'));
            if (eventSignatureHash !== topics[0]) {
                throw new Error('First topic does not match event signature hash');
            }
        } else {
            const decodedTopic = ethers.AbiCoder.defaultAbiCoder().decode([types[index - 1]], topic);
            console.log('Topic' + index + ': ' + decodedTopic);
        }
    });
    console.log();
}

decodeEventTopics();
