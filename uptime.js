module.exports = function (callback) {
    let output = '';
    let uptime = process.uptime();

    if (uptime >= 3600) {
        output += `${parseInt(uptime / 3600)}시간 `;
        output += `${parseInt(uptime / 60 - parseInt(uptime / 3600) * 60)}분 `;
        output += `${parseInt(uptime % 60)}초 `;
        output += '동안 실행 중 입니다.';
    } else if (uptime >= 60) {
        output += `${parseInt(uptime / 60)}분 `;
        output += `${parseInt(uptime % 60)}초 `;
        output += '동안 실행 중 입니다.';
    } else {
        output += `${parseInt(uptime)}초 `;
        output += '동안 실행 중 입니다.';
    }

    callback(output);
};
