import React from 'react';
import {Link} from '@nextui-org/react';

type Props = {
    name: string;
    githubUser: string;
    github?: string;
};

export const AvatarCredit: React.FC<Props> = ({name, githubUser, github}) => {
    return (
        <div className={'flex flex-col justify-center items-center w-full p-2'}>
            <Link
                href={github || 'https://github.com/' + githubUser}
                color={'foreground'}
                underline={'hover'}
                target="_blank"
                rel="noopener noreferrer"
                isExternal={true}
                showAnchorIcon={true}
                className={'text-sm pb-1'}>
                {name}
            </Link>
        </div>
    );
};
