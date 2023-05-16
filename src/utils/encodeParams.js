// import ethers from 'ethers';

// const AbiCoder = ethers.utils.AbiCoder;
// const ADDRESS_PREFIX_REGEX = /^(41)/;
// const ADDRESS_PREFIX = "41";

// const encodeParams = async (inputs) => {
//     let typesValues = inputs
//     let parameters = ''

//     if (typesValues.length == 0)
//         return parameters
//     const abiCoder = new AbiCoder();
//     let types = [];
//     const values = [];

//     for (let i = 0; i < typesValues.length; i++) {
//         let {type, value} = typesValues[i];
//         if (type == 'address')
//             value = value.replace(ADDRESS_PREFIX_REGEX, '0x');
//         else if (type == 'address[]')
//             value = value.map(v => toHex(v).replace(ADDRESS_PREFIX_REGEX, '0x'));
//         types.push(type);
//         values.push(value);
//     }

//     console.log(types, values)
//     try {
//         parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');
//     } catch (ex) {
//         console.log(ex);
//     }
//     return parameters

// }

// async function test() {
//     let inputs = [
//         {type: 'address', value: "412ed5dd8a98aea00ae32517742ea5289761b2710e"},
//         {type: 'uint256', value: 50000000000}
//     ]
//     let parameters = await encodeParams(inputs)
//     console.log(parameters)
// }

// // test()

// export default encodeParams;
