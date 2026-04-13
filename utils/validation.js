function isInteger(value) {
  return Number.isInteger(value);
}

function isNullableInteger(value) {
  return value === null || value === undefined || isInteger(value);
}

function isNullableNumber(value) {
  return value === null || value === undefined || typeof value === 'number';
}

function isValidString(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isNullableString(value, maxLength) {
  return value === null || value === undefined || (typeof value === 'string' && value.length <= maxLength);
}

function isValidYear(value) {
  return isInteger(value) && value >= 1800 && value <= 9999;
}

function isValidDuration(value) {
  return isInteger(value) && value >= 1 && value <= 999;
}

function isValidTimestamp(value) {
  return value === null || value === undefined || !Number.isNaN(Date.parse(value));
}

function isValidDecimal(value) {
  if (value === null || value === undefined) return true;
  if (typeof value !== 'number') return false;
  const stringValue = value.toFixed(2);
  return /^\d{1,8}(\.\d{1,2})?$/.test(stringValue) && Math.abs(value) < 100000000;
}

function validateFilmePayload(payload) {
  const errors = [];
  if (!isValidString(payload.nome, 30)) {
    errors.push('O campo nome é obrigatório e deve ter até 30 caracteres.');
  }
  if (!isValidYear(payload.ano)) {
    errors.push('O campo ano é obrigatório e deve ser um número de 4 dígitos válido.');
  }
  if (!isValidDuration(payload.duracao)) {
    errors.push('O campo duracao é obrigatório e deve ser um número entre 1 e 999.');
  }
  if (!isValidString(payload.foto, 45)) {
    errors.push('O campo foto é obrigatório e deve ter até 45 caracteres.');
  }
  if (!isNullableInteger(payload.estilo)) {
    errors.push('O campo estilo deve ser um integer ou null.');
  }
  if (!isNullableString(payload.sinopse, 2000)) {
    errors.push('O campo sinopse deve ser uma string ou null, até 2000 caracteres.');
  }
  if (!isNullableString(payload.video, 45)) {
    errors.push('O campo video deve ser uma string ou null, até 45 caracteres.');
  }
  return errors;
}

function validateLocacaoPayload(payload) {
  const errors = [];
  if (!isNullableInteger(payload.filmeId)) {
    errors.push('O campo filmeId deve ser um integer ou null.');
  }
  if (!isNullableNumber(payload.clienteId)) {
    errors.push('O campo clienteId deve ser um número ou null.');
  }
  if (!isValidTimestamp(payload.emissao)) {
    errors.push('O campo emissao deve ser um timestamp ISO válido ou null.');
  }
  if (!isValidTimestamp(payload.devolucao)) {
    errors.push('O campo devolucao deve ser um timestamp ISO válido ou null.');
  }
  if (!isValidDecimal(payload.valor)) {
    errors.push('O campo valor deve ser decimal(10,2) ou null.');
  }
  return errors;
}

module.exports = {
  validateFilmePayload,
  validateLocacaoPayload
};