import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id; // middleware autenticação

    const { year, month, day } = request.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointments,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year,
      month,
      day,
    });
    return response.json(appointments);
  }
}
