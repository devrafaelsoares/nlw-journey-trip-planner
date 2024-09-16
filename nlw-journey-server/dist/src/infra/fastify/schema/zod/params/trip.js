"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefuseTripParamsSchema = exports.ConfirmationTripParamsSchema = exports.InviteRefuseTripParamsSchema = exports.AttendanceConfirmationTripParamsSchema = exports.SendInviteTripParamsSchema = exports.FindByIdTripParamsSchema = exports.UpdateTripParamsSchema = void 0;
var zod_1 = require("zod");
var TripIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().describe('Identificador único da viagem'),
});
var TripParticipantIdParamSchema = zod_1.z.object({
    tripId: zod_1.z.string().uuid().describe('Identificador único da viagem'),
    participantId: zod_1.z.string().uuid().describe('Identificador único do usuário'),
});
exports.UpdateTripParamsSchema = TripIdParamSchema;
exports.FindByIdTripParamsSchema = TripIdParamSchema;
exports.SendInviteTripParamsSchema = TripIdParamSchema;
exports.AttendanceConfirmationTripParamsSchema = TripParticipantIdParamSchema;
exports.InviteRefuseTripParamsSchema = TripParticipantIdParamSchema;
exports.ConfirmationTripParamsSchema = TripIdParamSchema;
exports.RefuseTripParamsSchema = TripIdParamSchema;
