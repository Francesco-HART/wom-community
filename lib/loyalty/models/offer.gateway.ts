import { Offer } from "./offer.model";

export interface OfferGateway {
  getEventOffersByConsumerID(consumerID: string): Promise<Offer[]>;
}
