const Sequelize = require('sequelize');

const logger = require('pino')({
	level : 'trace'
});
/**
 * Getting a value from application env, or a default - ES6 version
 * @param {string} constKey key to lookup in environment variables
 * @param {string|number} value default value if not specifeid
 * @param {boolean} secret if the value is security-sensible (passwords) will mask any logging
 * 
 * @returns {string} the value of the environment variable
 */
const getConstValue = (constKey, value, secret = false) => {
	let constValue = value;
	const fromOS = process.env[constKey];
	if (fromOS) {
		// constValue is now of type string
		constValue = fromOS;
		logger.info(`${constKey}: using ${secret === true ? '****' : constValue}`);
		if (typeof value === 'number') {
			constValue = parseInt(constValue, 10);
		}
	}
	return constValue;
};

const Op = Sequelize.Op;
const operatorsAliases = {
	$eq            : Op.eq,
	$ne            : Op.ne,
	$gte           : Op.gte,
	$gt            : Op.gt,
	$lte           : Op.lte,
	$lt            : Op.lt,
	$not           : Op.not,
	$in            : Op.in,
	$notIn         : Op.notIn,
	$is            : Op.is,
	$like          : Op.like,
	$notLike       : Op.notLike,
	$iLike         : Op.iLike,
	$notILike      : Op.notILike,
	$regexp        : Op.regexp,
	$notRegexp     : Op.notRegexp,
	$iRegexp       : Op.iRegexp,
	$notIRegexp    : Op.notIRegexp,
	$between       : Op.between,
	$notBetween    : Op.notBetween,
	$overlap       : Op.overlap,
	$contains      : Op.contains,
	$contained     : Op.contained,
	$adjacent      : Op.adjacent,
	$strictLeft    : Op.strictLeft,
	$strictRight   : Op.strictRight,
	$noExtendRight : Op.noExtendRight,
	$noExtendLeft  : Op.noExtendLeft,
	$and           : Op.and,
	$or            : Op.or,
	$any           : Op.any,
	$all           : Op.all,
	$values        : Op.values,
	$col           : Op.col
};
const DEFAULT_PORT = 5432;
const local = {
	host       : getConstValue('DB_HOST', 'localhost'),
	port       : getConstValue('DB_PORT', DEFAULT_PORT),
	dialect    : getConstValue('DATABASE_URL', 'sqlite').split(':')[0],
	database   : getConstValue('DB_NAME', 'multiplatform-pokedex'),
	username   : getConstValue('DB_USER', 'root'),
	password   : getConstValue('DB_PASSWORD', 'pika'),
	storage    : './database.sqlite',
	operatorsAliases,
	/// used only by sequelize-typescript, currently unused
	modelPaths : [__dirname + '../**/*.model.ts']
};

module.exports = local;
