import {
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { JEV_URL, JEV_MODEL, JEV_HEADER } from './data/jev.api.constants.js';
import { DECISION_QUESTIONS } from './decision.schema.js';
import { JevRequestBody, JevResponse } from './data/jev.interfaces.js';

@Injectable()
export class JevService {
  private readonly logger = new Logger(JevService.name);

  async evaluate(message: string): Promise<JevResponse> {
    const body: JevRequestBody = {
      model: JEV_MODEL,
      state: message,
      questions: {
        billing: {
          type: 'noul',
          instructions: 'Is this message about billing?',
        },
      },
    };

    try {
      const response = await fetch(JEV_URL, {
        method: 'POST',
        headers: JEV_HEADER,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        const error = await response.text();

        this.logger.error(`Jev API error ${response.status}: ${error}`);

        if (response.status === 429 || response.status === 529) {
          throw new ServiceUnavailableException(
            'Jev service is temporarily unavailable',
          );
        }

        throw new InternalServerErrorException('Jev request failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      this.logger.error('Decision evaluation failed', error);

      if (
        error instanceof InternalServerErrorException ||
        error instanceof ServiceUnavailableException
      ) {
        throw error;
      }

      throw new ServiceUnavailableException('Unable to evaluate user message');
    }
  }
}
