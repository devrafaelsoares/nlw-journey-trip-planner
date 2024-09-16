"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routesFastify;
var adpaters_1 = require("../../../presentation/adpaters");
var trip_1 = require("../../../domain/usecases/trip");
var activity_1 = require("../../../domain/usecases/activity");
var email_1 = require("../../../domain/usecases/email");
var repositories_1 = require("../../../domain/repositories");
var link_1 = require("../../../domain/usecases/link");
var trip_2 = require("../../fastify/controllers/trip");
var link_2 = require("../../fastify/controllers/link");
var validators_1 = require("../../../domain/validators");
var trip_3 = require("../../fastify/schema/zod/trip");
var activity_2 = require("../../fastify/schema/zod/activity");
var link_3 = require("../../fastify/schema/zod/link");
var nodemailer_1 = require("../../email/nodemailer");
var activity_3 = require("../../fastify/controllers/activity");
// Repositórios
var tripPrismaRepository = new repositories_1.TripPrismaRepository();
var activityPrismaRepository = new repositories_1.ActivityPrismaRepository();
var participantPrismaRepository = new repositories_1.ParticipantPrismaRepository();
var linkPrismaRepository = new repositories_1.LinkPrismaRepository();
// Validadores
var participantValidatorSimple = new validators_1.ParticipantValidatorSimple();
var activityValidatorSimple = new validators_1.ActivityValidatorSimple();
var linkValidatorSimple = new validators_1.LinkValidatorSimple();
var tripValidatorSimple = new validators_1.TripValidatorSimple();
// Serviço de Email
var nodemailerSerivce = new nodemailer_1.NodemailerService();
var sendingEmailTripCreate = new email_1.SendingEmailTripCreate(nodemailerSerivce);
var sendingEmailTripInvite = new email_1.SendingEmailTripInvite(nodemailerSerivce);
/** CREATE TRIP */
var createTripUseCase = new trip_1.CreateTripUseCase(tripPrismaRepository, participantValidatorSimple, tripValidatorSimple, sendingEmailTripCreate, sendingEmailTripInvite);
var createTripControllerFastify = new trip_2.CreateTripControllerFastify(createTripUseCase);
/** UPDATE TRIP */
var updateTripUseCase = new trip_1.UpdateTripUseCase(tripPrismaRepository);
var updateTripControllerFastify = new trip_2.UpdateTripControllerFastify(updateTripUseCase);
/** FIND ALL TRIP */
var findAllTripsUseCase = new trip_1.FindAllTripsUseCase(tripPrismaRepository);
var findAllTripsControllerFastify = new trip_2.FindAllTripsControllerFastify(findAllTripsUseCase);
/** FIND BY ID TRIP */
var findByIdTripUseCase = new trip_1.FindByIdTripUseCase(tripPrismaRepository);
var findByIdTripControllerFastify = new trip_2.FindByIdTripControllerFastify(findByIdTripUseCase);
/** SEND TRIP INVITE */
var sendInviteUseCase = new trip_1.SendTripInviteUseCase(tripPrismaRepository, participantPrismaRepository, participantValidatorSimple, sendingEmailTripInvite);
var sendInviteControllerFastify = new trip_2.SendTripInviteControllerFastify(sendInviteUseCase);
/** CONFIRM TRIP INVITE */
var confirmParticipantUseCase = new trip_1.ConfirmTripInviteUseCase(tripPrismaRepository, participantPrismaRepository);
var confirmParticipantControllerFastify = new trip_2.ConfirmTripInviteControllerFastify(confirmParticipantUseCase);
/** REFUSE TRIP INVITE */
var refuseTripInviteUseCase = new trip_1.RefuseTripInviteUseCase(tripPrismaRepository, participantPrismaRepository);
var refuseTripInviteControllerFastify = new trip_2.RefuseTripInviteControllerFastify(refuseTripInviteUseCase);
/** REFUSE TRIP */
var refuseTripUseCase = new trip_1.RefuseTripUseCase(tripPrismaRepository);
var refuseTripControllerFastify = new trip_2.RefuseTripControllerFastify(refuseTripUseCase);
/** CONFIRM TRIP */
var confirmTripUseCase = new trip_1.ConfirmTripUseCase(tripPrismaRepository);
var confirmTripControllerFastify = new trip_2.ConfirmTripControllerFastify(confirmTripUseCase);
/** CREATE ACTIVITY */
var createActivityUseCase = new activity_1.CreateActivityUseCase(tripPrismaRepository, activityPrismaRepository, activityValidatorSimple);
var createActivityControllerFastify = new activity_3.CreateActivityControllerFastify(createActivityUseCase);
/** CREATE LINK */
var createLinkUseCase = new link_1.CreateLinkUseCase(tripPrismaRepository, linkPrismaRepository, linkValidatorSimple);
var createLinkControllerFastify = new link_2.CreateLinkControllerFastify(createLinkUseCase);
/** UPDATE LINK */
var updateLinkUseCase = new link_1.UpdateLinkUseCase(tripPrismaRepository, linkPrismaRepository, linkValidatorSimple);
var updateLinkControllerFastify = new link_2.UpdateLinkControllerFastify(updateLinkUseCase);
/** DELETE LINK */
var deleteLinkUseCase = new link_1.DeleteLinkUseCase(tripPrismaRepository, linkPrismaRepository);
var deleteLinkControllerFastify = new link_2.DeleteLinkControllerFastify(deleteLinkUseCase);
/** DELETE ACTIVITY */
var deleteActivityUseCase = new activity_1.DeleteActivityUseCase(tripPrismaRepository, activityPrismaRepository);
var deleteActivityControllerFastify = new activity_3.DeleteActivityControllerFastify(deleteActivityUseCase);
/** UPDATE ACTIVITY */
var updateActivityUseCase = new activity_1.UpdateActivityUseCase(tripPrismaRepository, activityPrismaRepository, activityValidatorSimple);
var updateActivityControllerFastify = new activity_3.UpdateActivityControllerFastify(updateActivityUseCase);
/** FIND ALL BY TRIP (LINKS) */
var findAllLinksByTripUseCase = new link_1.FindAllLinksByTripUseCase(tripPrismaRepository);
var findAllLinksByTripControllerFastify = new link_2.FindAllLinksByTripControllerFastify(findAllLinksByTripUseCase);
/** FIND BY ID AND TRIP (LINK) */
var findByIdLinkAndTripUseCase = new link_1.FindByIdLinkAndTripUseCase(tripPrismaRepository);
var findByIdLinkAndTripControllerFastify = new link_2.FindByIdLinkAndTripControllerFastify(findByIdLinkAndTripUseCase);
/** FIND ALL BY TRIP (ACTIVITIES) */
var findAllActivitiesByTripUseCase = new activity_1.FindAllActivitiesByTripUseCase(tripPrismaRepository);
var findAllActivitiesByTripControllerFastify = new activity_3.FindAllActivitiesByTripControllerFastify(findAllActivitiesByTripUseCase);
/** FIND BY ID AND TRIP (ACTIVITY) */
var findByIdActivityAndTripUseCase = new activity_1.FindByIdActivityAndTripUseCase(tripPrismaRepository);
var findByIdActivityAndTripControllerFastify = new activity_3.FindByIdActivityAndTripControllerFastify(findByIdActivityAndTripUseCase);
function routesFastify(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fastify
                .withTypeProvider()
                // Trips Routes
                .post('/trips', { schema: trip_3.TripCreateSchema }, (0, adpaters_1.fastifyAdapterRoute)(createTripControllerFastify))
                .get('/trips', { schema: trip_3.TripGetAllSchema }, (0, adpaters_1.fastifyAdapterRoute)(findAllTripsControllerFastify))
                .get('/trips/:id', { schema: trip_3.TripFindByIdSchema }, (0, adpaters_1.fastifyAdapterRoute)(findByIdTripControllerFastify))
                .put('/trips/:id', { schema: trip_3.TripUpdateSchema }, (0, adpaters_1.fastifyAdapterRoute)(updateTripControllerFastify))
                .post('/trips/:id/invites', { schema: trip_3.TripSendInviteSchema }, (0, adpaters_1.fastifyAdapterRoute)(sendInviteControllerFastify))
                .post('/trips/:tripId/participants/:participantId/confirm', { schema: trip_3.TripAttendanceConfirmationSchema }, (0, adpaters_1.fastifyAdapterRoute)(confirmParticipantControllerFastify))
                .get('/trips/:tripId/participants/:participantId/refuse', { schema: trip_3.TripRefuseInviteSchema }, (0, adpaters_1.fastifyAdapterRoute)(refuseTripInviteControllerFastify))
                .get('/trips/:id/confirm', { schema: trip_3.TripConfirmationSchema }, (0, adpaters_1.fastifyAdapterRoute)(confirmTripControllerFastify))
                .get('/trips/:id/refuse', { schema: trip_3.TripRefuseSchema }, (0, adpaters_1.fastifyAdapterRoute)(refuseTripControllerFastify))
                // Activity Routes
                .post('/trips/:id/activities', { schema: activity_2.TripActivityCreationSchema }, (0, adpaters_1.fastifyAdapterRoute)(createActivityControllerFastify))
                .put('/trips/:tripId/activities/:activityId', { schema: activity_2.TripActivityUpdateSchema }, (0, adpaters_1.fastifyAdapterRoute)(updateActivityControllerFastify))
                .delete('/trips/:tripId/activities/:activityId', { schema: activity_2.TripActivityDeleteSchema }, (0, adpaters_1.fastifyAdapterRoute)(deleteActivityControllerFastify))
                .get('/trips/:id/activities', { schema: activity_2.TripActivityFindAllSchema }, (0, adpaters_1.fastifyAdapterRoute)(findAllActivitiesByTripControllerFastify))
                .get('/trips/:tripId/activities/:activityId', { schema: activity_2.TripActivityFindByIdAndTripSchema }, (0, adpaters_1.fastifyAdapterRoute)(findByIdActivityAndTripControllerFastify))
                // Link Routes
                .post('/trips/:id/links', { schema: link_3.TripLinkCreateSchema }, (0, adpaters_1.fastifyAdapterRoute)(createLinkControllerFastify))
                .put('/trips/:tripId/links/:linkId', { schema: link_3.TripLinkUpdateSchema }, (0, adpaters_1.fastifyAdapterRoute)(updateLinkControllerFastify))
                .delete('/trips/:tripId/links/:linkId', { schema: link_3.TripLinkDeleteSchema }, (0, adpaters_1.fastifyAdapterRoute)(deleteLinkControllerFastify))
                .get('/trips/:id/links', { schema: link_3.TripLinkFindAllSchema }, (0, adpaters_1.fastifyAdapterRoute)(findAllLinksByTripControllerFastify))
                .get('/trips/:tripId/links/:linkId', { schema: link_3.TripLinkFindByIdAndTripSchema }, (0, adpaters_1.fastifyAdapterRoute)(findByIdLinkAndTripControllerFastify));
            return [2 /*return*/];
        });
    });
}
