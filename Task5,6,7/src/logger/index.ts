import { format, createLogger, transports } from 'winston';
import { Logger } from '../types/logger';

export const logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.simple(),
            )
        })
    ]
});

export const winstoneLogger = (req: any, _res: any, next: any) => {
    const { method, path, query } = req;
    sendLog({ method, path, query });
    next();
};

export const sendLog = ({ method, path, query, id, message }: Logger) => {
    let log = '';
    if (message) log += '!!! Error !!!: ';
    if (method) log += `Method: "${method}"; `;
    if (path) log += `Path: "${path}"; `;
    if (query) log += `Query params: ${JSON.stringify(query)}; `;
    if (id) log += `Query params: id = ${id}; `;
    if (message) log += `Message: ${message};`;
    logger.info(log);
};
