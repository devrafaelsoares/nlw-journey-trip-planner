import { Link as PrismaLink } from '@prisma/client';
import { Link, LinkProps, LinkPropsCreate } from '@domain/entities';
import { CreateLinkRequestProps, LinkResponseProps } from '@presentation/adpaters/link';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { Either, error, success } from '@/helpers';

export class LinkMapper {
    static toDomain(createdLink: PrismaLink): Link {
        const { id, title, url } = createdLink;
        const linkResult = Link.create(
            {
                url,
                title,
            },
            undefined,
            id
        );

        const link = linkResult.value as Link;

        return link;
    }

    static toDomainWithValidation(
        requets: CreateLinkRequestProps,
        linkValidator: Validator<LinkPropsCreate>
    ): Either<ValidationError<LinkProps>[], Link> {
        const { url, title } = requets;

        const linkPropsCreate: LinkPropsCreate = {
            url,
            title,
        };

        const linkResult = Link.create(linkPropsCreate, linkValidator);

        if (linkResult.isError()) {
            return error(linkResult.value);
        }

        const link = linkResult.value;

        return success(link);
    }

    static toHttpResponse(data: Link): LinkResponseProps {
        return {
            id: data.id,
            title: data.title,
            url: data.url,
        };
    }
}
