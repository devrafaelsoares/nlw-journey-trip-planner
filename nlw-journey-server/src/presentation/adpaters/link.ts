export type LinkResponseProps = {
    id: string;
    title: string;
    url: string;
};

export type LinkIdAndTripIdParamsProps = {
    tripId: string;
    linkId: string;
};

export type LinkIdParamsProps = {
    id: string;
};

export type CreateLinkRequestProps = Pick<LinkResponseProps, 'title' | 'url'>;

export type UpdateLinkRequestProps = Pick<LinkResponseProps, 'title' | 'url'>;

export type CreateLinkParamsProps = LinkIdParamsProps;

export type FindAllLinksByTripParamsProps = LinkIdParamsProps;

export type FindByIdLinksAndTripParamsProps = LinkIdAndTripIdParamsProps;

export type DeleteLinkParamsProps = LinkIdAndTripIdParamsProps;

export type UpdateLinkParamsProps = LinkIdAndTripIdParamsProps;
